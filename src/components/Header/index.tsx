import { HeaderContainer } from './styles'
import { Timer, Scroll } from 'phosphor-react'
import logoIgnite from '../../assets/logo-ignite.svg'
import { NavLink } from 'react-router-dom'
export function Header() {
  return (
    <HeaderContainer>
      <img src={logoIgnite} />
      <nav>
        <NavLink title="Timer" to="/">
          <Timer size={24} />
        </NavLink>
        <NavLink title="Histórico" to="/history">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
