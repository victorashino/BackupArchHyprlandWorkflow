const getDate = (start: number = 90) => {
  const date = new Date()

  const todayDay = String(date.getDate()).padStart(2, '0')
  const todayMonth = String(date.getMonth() + 1).padStart(2, '0')
  const todayYear = date.getFullYear()

  const pastDate = new Date(date)
  pastDate.setDate(date.getDate() - 89)

  const pastDay = String(pastDate.getDate()).padStart(2, '0')
  const pastMonth = String(pastDate.getMonth() + 1).padStart(2, '0')
  const pastYear = pastDate.getFullYear()

  const startDate = `${pastYear}-${pastMonth}-${pastDay}`
  const endDate = `${todayYear}-${todayMonth}-${todayDay}`

  return [startDate, endDate]

}

const getDayOfWeekAndMonth = (dateString: string) => {
    const date = new Date(dateString)
    date.setDate(date.getDate() + 1)

    const dayOfTheMonthFormatter = new Intl.DateTimeFormat('pt-BR', { day: '2-digit' })
    const dayOfWeekFormatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })

    const formattedMonthDay = dayOfTheMonthFormatter.format(date)
    const formattedWeekDay = dayOfWeekFormatter.format(date)

    const month = formattedMonthDay
    const week = formattedWeekDay

    return { week, month }
};


interface Extract {
    id: string
    method: string
    name: string
    send: number
    amount: number
    created: string
  }
  
  const groupByDate = (extracts: Extract[]) => {
    return extracts.reduce((acc, extract) => {
      const date = extract.created.split(' ')[0]
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(extract)
      return acc
    }, {} as Record<string, Extract[]>)
  };

  const filterExtractsByDateRange = (extracts: Extract[], start: string, end: string) => {
    const startDate = new Date(start)
    const endDate = new Date(end)

    return extracts.filter(extract => {
        const extractDate = new Date(extract.created)
        return extractDate >= startDate && extractDate <= endDate
    })
};

export {
    getDate,
    getDayOfWeekAndMonth,
    groupByDate,
    filterExtractsByDateRange,
}