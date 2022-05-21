import dayjs from 'dayjs'
import { FunctionComponent, useEffect, useState } from 'react'

interface Props {
  type: 'daily' | 'weekly'
}

const NextQuest: FunctionComponent<Props> = ({ type }) => {
  const [nextQuestDate, setNextQuestDate] = useState(dayjs())
  const [timeString, setTimeString] = useState('')

  useEffect(() => {
    let questDate: dayjs.Dayjs

    if (type === 'daily') {
      questDate = dayjs.utc().hour(7).minute(0).second(0).millisecond(0)
    } else {
      questDate = dayjs.utc().day(2).hour(7).minute(5).second(0).millisecond(0)
    }

    if (questDate.isBefore(dayjs().utc())) {
      if (type === 'daily') {
        questDate = questDate.add(1, 'day')
      } else {
        questDate = questDate.add(1, 'week')
      }
    }

    setNextQuestDate(questDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    formatDate()
    const interval = setInterval(() => {
      formatDate()
    }, 1000)

    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextQuestDate])

  const formatDate = () => {
    if (type === 'daily') {
      setTimeString(
        dayjs.duration(nextQuestDate.diff(dayjs())).format('HH[h] mm[min]')
      )
    } else {
      setTimeString(
        dayjs.duration(nextQuestDate.diff(dayjs())).format('D[d] HH[h] mm[min]')
      )
    }
  }

  return (
    <span className='text-base'>
      (next in <span className='text-wt-accent'>{timeString}</span>)
    </span>
  )
}

export default NextQuest
