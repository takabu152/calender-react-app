import React ,{useContext,useState} from 'react'
import {
  SET_TARGETDATE,CREATE_EVENT,DELETE_EVENT
} from '../actions'

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

import HTML5Backend from 'react-dnd-html5-backend'
import TouchBackend from 'react-dnd-touch-backend';
// import { DragDropContext } from 'react-dnd'

const isTouchDevice = () => {
  /* タッチデバイス判定 */
  var result = false;
  if (window.ontouchstart === null) {
    result = true;
  }  
  return result;
 }


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
  paper: {
    margin: theme.spacing(5, 10),
    padding: theme.spacing(5, 5),
  },
  yearmonth: {
    margin: theme.spacing(2, 0, 1, 0),
  },
  tableHead: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.light,
  },
  buttonMargin: {
    margin: theme.spacing(1),
  },
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

const useCalendarCellStyles = makeStyles(theme => ({
  calendarCell: {
    color: ({wday, isTargetMonth}) => {
      if(isTargetMonth) {
        switch(wday) {
          case 0: // Sunday
            return red[500]
          case 6: // Saturday
            return blue[500]
          default:
            return theme.palette.text.primary
        }
      } else {
        // previous or next month
        switch(wday) {
            case 0: // Sunday
            return red[200]
          case 6: // Saturday
            return blue[200]
          default:
            return theme.palette.text.secondary
        }
      }
    },
  },
}))

const useEventGridStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function CalendarTableCell(props) {
  const {wday, isTargetMonth, children, ...other} = props
  const classes = useCalendarCellStyles(props)
  return (<TableCell className={classes.calendarCell} {...other}>{children}</TableCell>)
}

const CalenderForm = () => {
    //prop経由だったstateとdispatchをコンテキストで受け取る 
    const {state,dispatch} = useContext(AppContext)
    console.log(state)

    

    const statetargetdate = Date.parse(state.targetdate)
    
    const calendar = getCalendarArray(Date.parse(state.targetdate))

    const classes = useStyles() // 追加

    const eventGridClasses = useEventGridStyles();

    // popover関連のstate
    const [open, setOpen] = React.useState(false);
    const [currentDate,setCurrentDate] = React.useState(null);
    const [currentTitle,setCurrentTitle] = React.useState('');
    
    
    const [startTime, setStartTime] = React.useState('00:00')
    const handleStartTimeChange = (event) => {
      console.log(event.target.value)
      setStartTime(event.target.value)
    }

    const [endTime, setEndTime] = React.useState('00:00')
    const handleEndTimeChange = (event) => {
      setEndTime(event.target.value)
    }

    const [title, setTitle] = React.useState('')
    const handleTitleChange = (event) => {
      setTitle(event.target.value)
    }

    const [place, setPlace] =React.useState('')
    const handlePlaceChange = (event) => {
      setPlace(event.target.value)
    }

    const [memo, setMemo] =React.useState('')
    const handleMemoChange = (event) => {
      console.log(event.target.value)
      setMemo(event.target.value)
    }

    const [URL, setURL] =React.useState('')
    const handleURLChange = (event) => {
      setURL(event.target.value)
    }

    const [id, setId] =React.useState(0)
    
    
    // Checkbox関連のstate
    const [allDayChecked, setChecked] = React.useState(false);
    // Checkboxの操作
    const handleCheckboxChange = (event) => {
      
      setChecked(event.target.checked)
      // console.log(allDayChecked)
    }

    // popoverclick
    // const handleClick = (event) => {
    //   console.log(event)
    //   console.log(event.currentTarget)
    //   setAnchorEl(event.currentTarget)
    //   setCurrentDate('2019-10-10')
    // };
 
    // pop画面を開く
    // const handleClickOpen = (e) => {
    //   e.preventDefault()
    //   setCurrentDate(timeIso8601(e.currentTarget.value))

    //   //state初期化
    //   // 今から開く日付のデータがあれば、それをセット
    //   // なければ、空白にしてセット
    //   setOpen(true)
    // }

    const handleClickEdit = (e) => {

      //setCurrentDate(e.currentTarget.value)
      //画面表示する際、内容を表示させる。
      (state.events.filter(event => event.id == e.currentTarget.value)).map((event) => {
        setTitle(event.title)
        setPlace(event.place)
        setMemo(event.memo)
        setURL(event.url)
        setStartTime(event.startTime)
        setEndTime(event.endTime)
        setChecked(event.allDayChecked)
        setId(event.id)
        setCurrentDate(event.day)
        }
      )
      setOpen(true)
    }

    // pop画面を閉じる
    const handleClose = () => {
      setOpen(false)
    }

    const deleteOnClick = (e) => {
      e.preventDefault()
      if (window.confirm('削除します。よろしいですか？'))
      {
        console.log(e.currentTarget.value)
        dispatch({
          type:DELETE_EVENT,
          id:e.currentTarget.value
        })
      }
    }

    // pop画面からstateのeventsに登録する
    const handleSubscribe = () =>{
      // console.log(currentDate)
      // 仕様的にUpdateしかあり得なくなってる。一度削除して再登録？
      // それとも更新？？

      dispatch({
        type:DELETE_EVENT,
        id:id
      })

      dispatch({
        type:CREATE_EVENT,
        day:currentDate,
        title:title,
        place:place,
        url:URL,
        allDayChecked:allDayChecked,
        startTime:startTime,
        endTime:endTime,
        memo:memo
      })
      setOpen(false)
    }

    const currenTitleOnKeyDown = (date,e) =>{
      
      // Enterキーを押した時に新規登録する。
      if (e.keyCode === 13)
      {
        // console.log(e.target)
        // console.log(e.target.value)

        // console.log(date)
        
        dispatch({
          type:CREATE_EVENT,
          day:timeIso8601(date),
          title:e.target.value,
          place:'',
          url:'',
          allDayChecked:false,
          startTime:'00:00',
          endTime:'00:00',
          mem:'',
          URL:''
        })

        e.target.value = ''
      }
    }
  
    // pop画面に日付を引き渡すため
    const setTargetDate = (targetdate) =>{
      dispatch({
        type:SET_TARGETDATE,
        targetdate:targetdate
      })
    }

    return (
    <>
      <CssBaseline />  {/* 追加 */}
      <Paper className={classes.paper}>  {/* 追加 */}
        <Grid container justify="space-between">
          <Grid item>
            <Button variant="outlined" onClick={() => setTargetDate(subMonths(Date.parse(state.targetdate), 1))}>前の月</Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={() => setTargetDate(new Date())}>今月</Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={() => setTargetDate(addMonths(Date.parse(state.targetdate), 1))}>次の月</Button>
           </Grid>
        </Grid>
        <Typography variant="h4" align="center" className={classes.yearmonth}>{format(statetargetdate, 'y年M月')}</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" classes={{head: classes.tableHead, }}>日</TableCell>
              <TableCell align="center" classes={{head: classes.tableHead, }}>月</TableCell>
              <TableCell align="center" classes={{head: classes.tableHead, }}>火</TableCell>
              <TableCell align="center" classes={{head: classes.tableHead, }}>水</TableCell>
              <TableCell align="center" classes={{head: classes.tableHead, }}>木</TableCell>
              <TableCell align="center" classes={{head: classes.tableHead, }}>金</TableCell>
              <TableCell align="center" classes={{head: classes.tableHead, }}>土</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {calendar.map((weekRow, rowNum) => (
              <TableRow key={rowNum}>
                {weekRow.map(date => (
                  <CalendarTableCell key={getDay(date)} wday={getDay(date)} isTargetMonth={isSameMonth(date, statetargetdate)} align="center" valign="top">
                    {getDate(date)}日
                    {(state.events.filter(event => event.day === timeIso8601(date))).map((event) => 
                      <>
                      <Card className={classes.root} key = {event.id}>
                        <CardContent >
                          <div hidden id = {event.id}>{event.id}</div>
                          <Typography className={classes.card_title} color="textSecondary" gutterBottom >
                            {event.title}
                          </Typography> 
                          {/* <Button size="small" color="primary" onClick={handleClickEdit} value={event.id}>detail</Button> */}
                        </CardContent>
                        <CardActions>
                          <Button color="primary" value = {event.id} onClick={handleClickEdit}>
                            detail
                          </Button>
                          <Button color="secondary" value ={event.id} onClick={deleteOnClick}>
                            delete
                          </Button>
                        </CardActions>
                      </Card>
                      </>
                      )
                    } 
                    {/* <Button  variant="outlined" size="small" className={classes.buttonMargin} variant="contained" value ={date} onClick={handleClickOpen}>+</Button> */}
                    <TextField id={format(date,'yyyyMMdd')} label="+" onKeyDown={(e) => currenTitleOnKeyDown(date, e)}/>
                    <div>aaaaaa</div>
                  
                  </CalendarTableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper> 
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Input Plan</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Input your plan
          </DialogContentText>
          <FormControlLabel
            control={
              <Checkbox
                checked={allDayChecked}
                onChange={handleCheckboxChange}
                name="allDayCheckbox"
                color="primary"
              />
            }
            label="All Day"
          />
          <TextField
            id="startTime"
            label="Start Time"
            type="time"
            defaultValue="00:00"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            value ={startTime}
            onChange={handleStartTimeChange}
          />
          <TextField
            id="endTime"
            label="End Time"
            type="time"
            defaultValue="00:00"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            value = {endTime}
            onChange={handleEndTimeChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            value={title}
            onChange={handleTitleChange}
          />
          <TextField
            margin="dense"
            id="place"
            label="Place"
            type="text"
            fullWidth
            value={place}
            onChange={handlePlaceChange}
          />
          <TextField
            margin="dense"
            id="memo"
            label="Memo"
            type="text"
            fullWidth
            multiline
            rowsMax={4}
            value={memo}
            onChange={handleMemoChange}
          />
          <TextField
          margin="dense"
          id="url"
          label="URL"
          type="text"
          fullWidth
          value={URL}
          onChange={handleURLChange}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubscribe} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>

    </>
    )
}

export default CalenderForm
// export default　DragDropContext(isTouchDevice() ? TouchBackend : HTML5Backend)(CalenderForm)
