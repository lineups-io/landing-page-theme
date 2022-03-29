import { base as theme } from '@theme-ui/presets'
import merge from 'deepmerge'

import base from './base'
import gallery from './gallery'

export default merge.all([
  theme,
  base,
  gallery,
])
