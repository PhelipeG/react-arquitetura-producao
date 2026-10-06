import { NavLink } from 'react-router';

import { cn } from '@/lib/utils';

export default function Navigation() {
  /**
   * end ->  propriedade que serve para indicar que o link é o link principal da aplicação
   * isActive ->  propriedade que serve para indicar se o link está ativo
   * className ->  propriedade que serve para indicar o className do link
   * to ->  propriedade que serve para indicar o link para onde o link deve redirecionar
   * children ->  propriedade que serve para indicar o children do link
   * onClick ->  propriedade que serve para indicar o onClick do link
   * onMouseEnter ->  propriedade que serve para indicar o onMouseEnter do link
   * onMouseLeave ->  propriedade que serve para indicar o onMouseLeave do link
   * ** */
  return (
    <NavLink
      to="/"
      end
      className={({ isActive }) =>
        cn(
          'flex items-center gap-2 text-sm hover:text-primary px-3 py-2 rounded-md',
          isActive && 'font-semibold',
        )
      }
    ></NavLink>
  );
}
