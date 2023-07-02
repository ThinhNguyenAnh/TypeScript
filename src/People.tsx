import React, { useEffect, useState } from 'react';

interface People {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    date_of_birth: string;
    age: number;
}


const calculateAge = (dateOfBirth: string): number => {
    const birthDate = new Date(dateOfBirth);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    // Check if the birthday hasn't occurred yet this year
    if (
        currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() &&
            currentDate.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age;
};

const formatDate = (date: string): string => {
    const parsedDate = new Date(date);
    const formattedDate = parsedDate.toLocaleDateString('en-GB');

    return formattedDate;
};


const MyComponent =() => {
    const [peoples, setPeoples] = useState<People[]>([]);
    const [searchTerm, setSearchTerm] = useState(''); //search

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://random-data-api.com/api/users/random_user?size=10');
                const data = await response.json();
                setPeoples(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredPeoples = searchTerm
        ? peoples.filter((people) => {
            const fullName = `${people.first_name} ${people.last_name}`;
            return fullName.toLowerCase().includes(searchTerm.toLowerCase());
        })
        : peoples;


    return (
        <div>
            <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <table>
                <thead>
                    <tr>
                        <th >Id</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Brithday</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPeoples.map((people) => (
                        <tr key={people.id}>
                            <td>{people.id}</td>
                            <td>{people.first_name} {people.last_name}</td>
                            <td>{people.email}</td>
                            <td>{formatDate(people.date_of_birth)}</td>
                            <td>{calculateAge(people.date_of_birth)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyComponent;
