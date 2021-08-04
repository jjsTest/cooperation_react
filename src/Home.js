import './Home.css';

function Home() {
    return (
      <div>
        <header>
        <h1>프로파일+member's name</h1>
				<nav>
					<ul>
						<li><a href="#signIn">sign in</a></li>
						<li><a href="#signUp">sign up</a></li>
						<li><a href="#community">community</a></li>
            {/* 노티스, 컨택트, 방명록은 커뮤니티 드롭다운으로 */}
						<li><a href="#chat">chat</a></li>
					</ul>
				</nav>
        </header>
      </div>
    );
  }
  
  export default Home;