import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <p className="footer__word">
          Learn Business. Work on Real Projects. <em>Think Like a Founder.</em>
        </p>
        <div className="footer__cols">
          <div>
            <h3>TTP — Teacher Training Programme</h3>
            <p>
              Founder education with a second act:
              <br />
              real startup projects after every course.
            </p>
          </div>
          <div>
            <h3>Quick links</h3>
            <ul>
              <li>
                <Link to="/courses">Courses</Link>
              </li>
              <li>
                <Link to="/projects">Real Projects</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Contact</h3>
            <p>
              9109563282
              <br />
              teachertrainingprogramme3@gmail.com
              <br />
              Bhopal, Madhya Pradesh
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
