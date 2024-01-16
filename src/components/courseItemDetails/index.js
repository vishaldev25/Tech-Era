import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import CourseItemCard from '../CourseItemCard'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseItemDetails extends Component {
  state = {
    courseDetailing: {},
    apiStatu: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getCourseItem()
  }

  getCourseItem = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`

    this.setState({apiStatu: apiStatusConstant.inProgress})

    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()

      const filterd = {
        id: data.course_details.id,
        name: data.course_details.name,
        description: data.course_details.description,
        imageUrl: data.course_details.image_url,
      }
      this.setState({
        courseDetailing: filterd,
        apiStatu: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatu: apiStatusConstant.failure})
      console.log('erro')
    }
  }

  renderLoader = () => (
    <div className="loader" data-testid="loader">
      <Loader width={80} height={80} type="dots" />
    </div>
  )

  renderCourseItem = () => {
    const {courseDetailing} = this.state
    const {id, imageUrl, description, name} = courseDetailing

    return (
      <ul>
        <CourseItemCard
          id={id}
          imageUrl={imageUrl}
          description={description}
          name={name}
        />
      </ul>
    )
  }

  onClickRetryValue = () => {
    this.getCourseItem()
  }

  renderFailureView = () => (
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
        onClick={this.onClickRetryValue}
      >
        Retry
      </button>
    </div>
  )

  renderValues = () => {
    const {apiStatu} = this.state
    switch (apiStatu) {
      case apiStatusConstant.success:
        return this.renderCourseItem()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      case apiStatusConstant.inProgress:
        return this.renderLoader()
      default:
        return ''
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="course-item-details">
          <div className="card-values">{this.renderValues()}</div>
        </div>
      </>
    )
  }
}

export default CourseItemDetails
