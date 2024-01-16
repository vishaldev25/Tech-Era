import {Link} from 'react-router-dom'

import './index.css'

const CourseCard = props => {
  const {courseDetails} = props
  const {id, logoUrl, name} = courseDetails

  return (
    <Link to={`/courses/${id}`} className="nav-links">
      <li className="course-card-list">
        <img src={logoUrl} alt={name} className="course-card-image" />
        <p className="course-card-heading">{name}</p>
      </li>
    </Link>
  )
}

export default CourseCard
