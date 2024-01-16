import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CourseCard from '../CourseCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    courseList: [],
  }

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch('https://apis.ccbp.in/te/courses')
    if (response.ok === true) {
      const data = await response.json()

      const updated = data.courses.map(each => ({
        id: each.id,
        logoUrl: each.logo_url,
        name: each.name,
      }))
      this.setState({
        courseList: updated,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
      console.log('Not Valid')
    }
  }

  renderCourses = () => {
    const {courseList} = this.state

    return (
      <ul className="unordered-courses">
        {courseList.map(each => (
          <CourseCard key={each.id} courseDetails={each} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="loader" data-testid="loader">
      <Loader width={80} height={80} type="dots" />
    </div>
  )

  onClickRetry = () => {
    this.getCourses()
  }

  renderFailure = () => (
    <div className="failure-home">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="failure-button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderFinal = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCourses()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return ''
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="home">
            <h1 className="home-heading">Courses</h1>
            {this.renderFinal()}
          </div>
        </div>
      </>
    )
  }
}

export default Home
