
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useLunar from '../../hooks/useLunar';
import favorableFavicon from '../../image/images.png';
import unfavorableFavicon from '../../image/images2.jpeg';
import './styleCalendasr/styleCalendasr.css';

function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showFavicons, setShowFavicons] = useState(false);
    const location = useLocation();
    const seedName = location.state?.seedName;
    const lunarData = useLunar();
    const currentMonth = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const [favorableDays, setFavorableDays] = useState<number[]>([]);
    const [showUnfavorableFavicons, setShowUnfavorableFavicons] = useState(false);
    const [unfavorableDays, setUnfavorableDays] = useState<number[]>([]);
    
    useEffect(() => {
        const monthlyData = lunarData.find(data => data.id === currentMonth);
        if (monthlyData) {
            setFavorableDays(monthlyData.dayYes.split(',').map(Number));
            setUnfavorableDays(monthlyData.dayNo.split(',').map(Number));
        }
        }, [lunarData, currentMonth]);
        
        const handleCheckboxChange = () => {
            setShowFavicons(!showFavicons);
        };
        
        const handleUnfavorableCheckboxChange = () => {
            setShowUnfavorableFavicons(!showUnfavorableFavicons);
        };

        const renderCalendar = () => {
        const daysArray = [];
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        const totalDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        
        for (let i = 0; i < firstDayOfMonth; i++) {
            daysArray.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }
        
        for (let day = 1; day <= totalDays; day++) {
            const isFavorable = favorableDays.includes(day);
            const isUnfavorable = unfavorableDays.includes(day);
            daysArray.push(
                <div key={day} className={`calendar-day ${isFavorable && showFavicons ? 'favorable' : ''} ${isUnfavorable && showUnfavorableFavicons ? 'unfavorable' : ''}`} onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}>
                    {day}
                    {isFavorable && showFavicons && <img src={favorableFavicon} alt="Favorable" />}
                    {isUnfavorable && showUnfavorableFavicons && <img src={unfavorableFavicon} alt="Unfavorable" />}
                </div>
            );
        }
    
    return daysArray;
    };
    
    return (
    <div className="calendar-container">
        <div className="calendar-header">
            <h2>{currentDate.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}</h2>
            <div className="calendar-button">
                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}>Предыдущий</button>
                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}>Следующий</button>
            </div>
        </div>
        <div className="calendar-grid">
            {renderCalendar()}
        </div>

        <div className='day-checked'>
            <div className="day-checked">
                <div className="works-name">
                    <input type="checkbox" name="green" className="works-input green" id="important-matter" onChange={handleCheckboxChange} />
                    <label htmlFor="important-matter">Благоприятные дни посева</label>
                </div>
            </div>

            <div className="works-name">
                <input type="checkbox" name="yellow" className="works-input red" id="birthdays" onChange={handleUnfavorableCheckboxChange} />
                <label htmlFor="birthdays">Не благоприятные дни посева</label>
            </div>
        </div>
    </div>
    );
    }

export default Calendar
