import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
      <>
      <h1>Welcome</h1>
      <Stack>
          <Button variant="contained" component={Link} to="/login">Log-in</Button>
          <Button variant="outlined"  component={Link} to="/signup">Sign-up</Button>
      </Stack>
      </>
    )
}

export default Home
