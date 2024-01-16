import './index.css'

const CourseItemCard = props => {
  const {imageUrl, name, description} = props

  return (
    <li className="course-item-card">
      <img src={imageUrl} alt={name} className="course-item-card-image" />
      <div className="course-item-text">
        <h1 className="course-item-heading">{name}</h1>
        <p className="course-item-para">{description}</p>
      </div>
    </li>
  )
}

export default CourseItemCard
