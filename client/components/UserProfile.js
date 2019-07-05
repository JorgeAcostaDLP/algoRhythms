import React, {Component} from 'react'
import ProblemsSolved from './ProblemsSolved'
import {UserInfo} from '.'
import {getRoomHistoryThunk} from '../store/user'
import {connect} from 'react-redux'
import {id} from 'brace/worker/javascript'
import Loading from './Loading'
import Typography from '@material-ui/core/Typography'

class UserProfile extends Component {
  componentDidMount() {
    this.props.getRooms(this.props.userId)
    console.log(this.props)
  }

  render() {
    const {roomHistory} = this.props
    return (
      <div>
        <Typography component="h2" variant="h5">
          Problems History
        </Typography>
        {roomHistory && roomHistory.length === 0 ? (
          <Typography>0 Problems Solved</Typography>
        ) : roomHistory && roomHistory.length !== 0 ? (
          <ProblemsSolved roomHistory={this.props.roomHistory} />
        ) : (
          <Loading />
        )}
        <Typography color="textSecondary">
          Total Points=
          {roomHistory
            ? roomHistory
                .filter(room => !room.visible)
                .reduce((accum, curVal) => (accum += curVal.points), 0)
            : 'Loading'}{' '}
          on 15 March, 2019
        </Typography>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    roomHistory: state.user.roomHistory,
    userId: state.firebase.auth.uid
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getRooms: userId => dispatch(getRoomHistoryThunk(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)

/* eslint-disable no-script-url */
