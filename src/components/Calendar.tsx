import { useState, useEffect } from 'react';
import { useAuthContext } from "@/context/AuthContext";
import { apiRoutes } from "@/API/routes";
import axios from 'axios';
import { eventProps } from '@/types/types';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export const Calendar: React.FC = () => {
    const authContext = useAuthContext();
    const [taskList, setTaskList] = useState<eventProps[] | undefined>([]);
    
    useEffect(() => {
        axios
        .get(apiRoutes.tasks.all, {
            params: {
                userID: authContext?.user?.id,
            },
            headers: {
                Authorization: `Bearer ${authContext?.user?.token}`,
            },
        })
        .then((res) => {
          if (Array.isArray(res.data.data)) {
            const taskData = res.data.data.map((task: eventProps) => {
                return {
                    id: task.id as string,
                    title: task.title as string,
                    start: new Date(task.start),
                    allDay: task.allDay,
                };
            });
            setTaskList(taskData);
        } else {
            console.error("Unexpected response data format:", res.data);
        }
      })
        .catch((error) => {
            console.error("Error fetching tasks:", error)
        });
    }, [authContext]);
    console.log(taskList);

    return (
            <FullCalendar 
              plugins={[dayGridPlugin]} 
              initialView="dayGridMonth" 
              height="100%"
              events={taskList}
              />
    );
};