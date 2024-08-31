import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { BiLogoGmail } from 'react-icons/bi';
import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.footerTop}>
        <p>
          <span>YK Design</span>
        </p>
        <ul className={css.socials}>
          <li>
            <a
              href="mailto:yaroslavkosytsia@gmail.com"
              target="_blank"
              rel="noopener norefferer"
              aria-label="Gmail link"
            >
              <BiLogoGmail size={24} />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/yaroslav-kosytsia/"
              target="_blank"
              rel="noopener norefferer"
              aria-label="Linkedin profile"
            >
              <FaLinkedin size={24} />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/YK911"
              target="_blank"
              rel="noopener norefferer"
              aria-label="Github profile"
            >
              <FaGithub size={24} />
            </a>
          </li>
        </ul>
      </div>
      <div className={css.footerBottom}>
        <p>Copyright &copy; YK911</p>
      </div>
    </footer>
  );
}
