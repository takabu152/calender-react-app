import React ,{useContext,useState} from 'react'
import {DELETE_EVENT} from '../actions'
import AppContext from '../contexts/AppContext'
import { timeIso8601 } from '../utils'
//日付操作のライブラリの読み込み
import format from 'date-fns/format'
import getDate from 'date-fns/getDate'
import getDay from 'date-fns/getDay'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import addMonths from 'date-fns/addMonths'  
import subMonths from 'date-fns/subMonths'  
import endOfWeek from 'date-fns/endOfWeek'
import eachWeekOfInterval from 'date-fns/eachWeekOfInterval'
import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'
import isSameMonth from 'date-fns/isSameMonth'

//Material-UIの読み込み
import { makeStyles } from '@material-ui/core/styles'  
import CssBaseline from '@material-ui/core/CssBaseline'  
import Paper from '@material-ui/core/Paper'  
import Button from '@material-ui/core/Button' 
import Grid from '@material-ui/core/Grid' 
import Typography from '@material-ui/core/Typography'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { SET_INPUTEVENTOBJECT, SET_POPOVERSTATE } from '../actions'

const getCalendarArray = date => {
  const sundays = eachWeekOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date)
  })
  return sundays.map(sunday =>
    eachDayOfInterval({start: sunday, end: endOfWeek(sunday)})
  )
}

// 追加ここから
const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 100,
    marginBottom: 10,
    paddingLeft: 0,
    paddingRight:0,
    paddingTop:0,
    paddingBottom: 0,
    "&:last-child": {
      paddingBottom: 0
    }
  },
  card_bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  card_title: {
    fontSize: 14,
  },
  card_pos: {
    marginBottom: 12,
  },
}))
// 追加ここまで



const EventCardForm = (props) => {
    console.log('イベント確認')
    console.log(props.id)
    
    //prop経由だったstateとdispatchをコンテキストで受け取る 
    const {state,dispatch} = useContext(AppContext)
    const statetargetdate = Date.parse(state.targetdate)
    const calendar = getCalendarArray(Date.parse(state.targetdate))
    const classes = useStyles() // 追加

    const handleClickEdit = (e) => {
        // e.preventDefault()
        //setCurrentDate(e.currentTarget.value)
        //画面表示する際、内容を表示させる。
        (state.events.filter(event => event.id == e.currentTarget.value)).map((event) => {
          // stateにデータをセットする。
          dispatch({
              type:SET_INPUTEVENTOBJECT,
              day:event.day,
              title:event.title,
              place:event.place,
              url:event.url,
              allDayChecked:event.allDayChecked,
              startTime:event.startTime,
              endTime:event.endTime,
              memo:event.memo
            })
  
            dispatch({
                  type:SET_POPOVERSTATE,
                  popOverState:true
            })
          }
        )
      }
    
      const deleteOnClick = (e) => {
        e.preventDefault()
        console.log('deteleclick')
        if (window.confirm('削除します。よろしいですか？'))
        {
          console.log(e.currentTarget.value)
          dispatch({
            type:DELETE_EVENT,
            id:e.currentTarget.value
          })
        }
      }

    return (
    <>
    <Card className={classes.root} key = {props.id}>
    <CardContent >
        <div hidden id = {props.id}>{props.id}</div>
        <Typography className={classes.card_title} color="textSecondary" gutterBottom >
        {props.title}
        </Typography> 
    </CardContent>
    <CardActions>
        <Button color="primary" value = {props.id} onClick={handleClickEdit}>
        detail
        </Button>
        <Button color="secondary" value ={props.id} onClick={deleteOnClick}>
        delete
        </Button>
    </CardActions>
    </Card>
    </>
    )
}

export default EventCardForm

