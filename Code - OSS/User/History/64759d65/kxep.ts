// DATE
const date = new Date();

const todayDay = String(date.getDate()).padStart(2, '0');
const todayMonth = String(date.getMonth() + 1).padStart(2, '0');
const todayYear = date.getFullYear();


const pastDate = new Date(date);
pastDate.setDate(date.getDate() - 90);

const pastDay = String(pastDate.getDate()).padStart(2, '0');
const pastMonth = String(pastDate.getMonth() + 1).padStart(2, '0');
const pastYear = pastDate.getFullYear();

const startDate = `${pastYear}-${pastMonth}-${pastDay}`;
const endDate = `${todayYear}-${todayMonth}-${todayDay}`;

//
const getDayOfWeekAndMonth = (dateString: string) => {
    const date = new Date(dateString);
    const dayOfTheMonthformatter = new Intl.DateTimeFormat('pt-BR', { day: '2-digit' });
    const dayOfWeekformatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' });
  
    const formattedMonthDay = dayOfTheMonthformatter.format(date);
    const formattedWeekDay = dayOfWeekformatter.format(date);
  
    const month = formattedMonthDay;
    const week = formattedWeekDay;
    return { week, month };
  };
  

// DIALOG
const handlePress = () => {
    console.log('Botão pressionado!');
};

// FILTER

export {
    startDate,
    endDate,
    getDayOfWeekAndMonth,
    handlePress
}