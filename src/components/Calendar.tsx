import { useEffect} from 'react';
import FullCalendar from '@fullcalendar/react';
import { EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useMainContext } from "@/context/MainContext";

export const Calendar: React.FC = () => {
    const mainContext = useMainContext();

    useEffect(() => {
        mainContext.fetchTasks?.();
    }, [mainContext]);

    const handleEventClick = async (event: EventClickArg) => {
        const taskId = event.event.id;
        const taskData = mainContext.taskList?.find(task => task._id === taskId);
        if (taskData) {
            mainContext?.setTaskTemp(taskData);
            mainContext?.setModalType("update");
            mainContext?.setModal(true);
        }
    };

    return (
        <>
            <FullCalendar 
              plugins={[dayGridPlugin]} 
              initialView="dayGridMonth" 
              height="100%"
              events={mainContext.eventList}
              eventClick={handleEventClick}
              />
        </>
    );
};