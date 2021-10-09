import React from 'react';
import {Link} from 'react-router-dom';

function Header() {
  return (
    <div>
      



        <h1>프로파일+member's name</h1>
		<nav>
			<ul>
                <li><Link to="/">home</Link></li>
			    <li><Link to="/signIn">sign in</Link></li>
			    <li><Link to="/signUp">sign up</Link></li>
				<li><Link to="/community">community</Link></li>
              {/* 노티스, 컨택트, 방명록은 커뮤니티 드롭다운으로 */}
				<li><Link to="/chat">chat</Link></li>
              {/* 서치하는것도 추가 */}
			</ul>
		</nav>
    </div>
  );
}

export default Header;
