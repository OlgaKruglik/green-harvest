import { useState, useEffect } from 'react'
import { getSeeds } from  '../firebase'
import {Seed} from '../store/slice/userSlice'

function useSeeds() {
    const [seeds, setSeeds] = useState<Seed[]>([]);

    useEffect(() => {
        const fetchSeeds = async () => {
        try {
            const seedsData = await getSeeds();
            const formattedSeedsData: Seed[] = seedsData.map((seedData: any) => ({
            id: seedData.id,
            description: seedData.description,
            type: seedData.type,
            name: seedData.name,
            image: seedData.image,
            rating: seedData.rating,
        }));
        setSeeds(formattedSeedsData);
        } catch (error) {
            console.error("Ошибка при получении данных о семенах:", error);
        }
        };
        fetchSeeds();
    }, []);
    return seeds;
}

export default useSeeds





