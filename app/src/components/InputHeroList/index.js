import React from 'react'
import { Input } from 'semantic-ui-react'

const InputHeroList = () => (
  <div>
    <Input list='heros' placeholder='Hero name...' />
    <datalist id='heros'>
      <option value='1'>Anti-Mage</option>
      <option value='2'>Axe</option>
      <option value='3'>Bane</option>
    </datalist>
  </div>
)

export default InputHeroList
