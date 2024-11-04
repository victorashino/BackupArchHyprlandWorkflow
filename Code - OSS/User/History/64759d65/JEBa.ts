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

// ---- DATE FORMAT
const getDayOfWeekAndMonth = (dateString: string) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('pt-BR', {day: "2-digit"}).format(date);
    const [dayOfWeek, dayOfMonth] = formattedDate.split(", ");
    return { dayOfWeek, dayOfMonth: parseInt(dayOfMonth) };
}
  

// DIALOG BUTTON
const handlePress = () => {
    console.log('Botão pressionado!');
};

export {
    startDate,
    endDate,
    getDayOfWeekAndMonth,
    handlePress
}