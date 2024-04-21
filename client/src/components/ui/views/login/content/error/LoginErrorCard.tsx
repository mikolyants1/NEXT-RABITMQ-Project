import { Box } from '@chakra-ui/react';
import {memo} from 'react';

interface IProps {
  error:boolean
}
function LoginErrorCard({error}:IProps):JSX.Element {
  return (
        <Box>
          {error&&(
            <Box color='red'
             mt={5} textAlign='center'>
              login error
            </Box>
            )}
        </Box>
  )
}

export default memo(LoginErrorCard)