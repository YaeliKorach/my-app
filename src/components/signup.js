import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

export default function SignUp(props) {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    fullName: '',
    preferences: [],
    categories: [],
  });
  const [customPreference, setCustomPreference] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [preferencesOptions, setPreferencesOptions] = React.useState([
    'Business',
    'Current Affairs',
    'Education',
    'Entertainment',
    'Environment & Nature',
    'Health & Wellness',
    'Science & Technology',
    'Sports',
    'World News',
  ]);
  const categoriesOptions = [
    'business',
    'crime',
    'domestic',
    'education',
    'entertainment',
    'environment',
    'food',
    'health',
    'lifestyle',
    'other',
    'politics',
    'science',
    'sports',
    'technology',
    'top',
    'tourism',
    'world',
  ];

  const validateInputs = () => {
    const newErrors = {};

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    if (!formData.fullName || formData.fullName.length < 1) {
      newErrors.fullName = 'Full name is required.';
    }

    if (!formData.preferences.length) {
      newErrors.preferences = 'Please select at least one preference.';
    }

    if (!formData.categories.length) {
      newErrors.categories = 'Please select at least one category.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    const requestBody = {
      userToRegister: formData,
    };

    try {
      const response = await fetch('http://localhost:3007/news/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Registration successful!');
        console.log(result);
      } else {
        const error = await response.json();
        alert(`Registration failed: ${error.message || 'Unknown error'}`);
        console.error(error);
      }
    } catch (err) {
      alert(`Registration failed: ${err.message}`);
      console.error(err);
    }
  };

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCustomPreferenceAdd = () => {
    if (customPreference.trim()) {
      setFormData((prev) => ({
        ...prev,
        preferences: [...prev.preferences, customPreference.trim()],
      }));
      setPreferencesOptions((prev) =>
        prev.includes(customPreference.trim())
          ? prev
          : [...prev, customPreference.trim()]
      );
      setCustomPreference('');
    }
  };

  return (
    <SignUpContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Typography component="h1" variant="h4" sx={{ textAlign: 'center' }}>
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <FormControl>
            <FormLabel htmlFor="fullName">Full Name</FormLabel>
            <TextField
              id="fullName"
              name="fullName"
              placeholder="Yael Korach"
              value={formData.fullName}
              onChange={handleChange('fullName')}
              error={!!errors.fullName}
              helperText={errors.fullName}
              fullWidth
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              id="email"
              name="email"
              placeholder="example@example.com"
              value={formData.email}
              onChange={handleChange('email')}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              id="password"
              name="password"
              type="password"
              placeholder="••••••"
              value={formData.password}
              onChange={handleChange('password')}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="categories">Categories</FormLabel>
            <TextField
              id="categories"
              name="categories"
              select
              SelectProps={{
                multiple: true,
                value: formData.categories,
                onChange: handleChange('categories'),
              }}
              error={!!errors.categories}
              helperText={errors.categories}
              fullWidth
              required
            >
              {categoriesOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="preferences">Preferences</FormLabel>
            <TextField
              id="preferences"
              name="preferences"
              select
              SelectProps={{
                multiple: true,
                value: formData.preferences,
                onChange: handleChange('preferences'),
              }}
              error={!!errors.preferences}
              helperText={errors.preferences}
              fullWidth
              required
            >
              {preferencesOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <FormControl>
            <FormLabel>Add Custom Preference</FormLabel>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                placeholder="Type a custom preference"
                value={customPreference}
                onChange={(e) => setCustomPreference(e.target.value)}
                fullWidth
              />
              <Button variant="outlined" onClick={handleCustomPreferenceAdd}>
                Add
              </Button>
            </Box>
          </FormControl>
          <Button type="submit" fullWidth variant="contained">
            Sign up
          </Button>
        </Box>
      </Card>
    </SignUpContainer>
  );
}
