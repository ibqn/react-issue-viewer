import { createTheme, ThemeOptions } from '@material-ui/core/styles'

import indigo from '@material-ui/core/colors/indigo'
import orange from '@material-ui/core/colors/orange'

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      light: indigo[500],
      main: indigo[700],
      dark: indigo[900],
    },
    secondary: {
      light: orange[300],
      main: orange[500],
      dark: orange[700],
    },
  },
}

const theme = createTheme(themeOptions)

export { theme }
