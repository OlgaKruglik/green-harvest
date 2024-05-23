import { useState, useEffect } from 'react'
import { getLunarCalendar } from  '../firebase'
import {Lunar} from '../store/slice/userSlice'

function useLunar() {
    const [lunar, setLunar] = useState<Lunar[]>([]);

    useEffect(() => {
    const fetchLunarData = async () => {
    try {
    const lunarData = await getLunarCalendar();
    const formattedLunarData: Lunar[] = lunarData.map((data: any) => ({
    id: data.id,
    dayYes: data['day-yes'],
    dayNo: data['day-no'],  
    }));
    setLunar(formattedLunarData);
    } catch (error) {
    console.error("Ошибка при получении данных о лунном календаре:", error);
    }
    };
    fetchLunarData();
    }, []);
    
    return lunar;
    }

export default useLunar



