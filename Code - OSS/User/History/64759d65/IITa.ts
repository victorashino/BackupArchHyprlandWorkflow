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
    // Ajustar a data para um dia antes
    const date = new Date(dateString);
    date.setDate(date.getDate() - 1);

    // Formatar o dia do mês e o dia da semana
    const dayOfTheMonthFormatter = new Intl.DateTimeFormat('pt-BR', { day: '2-digit' });
    const dayOfWeekFormatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' });

    const formattedMonthDay = dayOfTheMonthFormatter.format(date);
    const formattedWeekDay = dayOfWeekFormatter.format(date);

    const month = formattedMonthDay;
    const week = formattedWeekDay;

    return { week, month };
};

  

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