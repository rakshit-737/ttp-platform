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
            <h4>TTP — Teacher Training Programme</h4>
            <p>
              Founder education with a second act:
              <br />
              real startup projects after every course.
            </p>
          </div>
          <div>
            <h4>Quick links</h4>
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
            <h4>Contact</h4>
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
