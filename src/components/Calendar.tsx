import FullCalendar from '@fullcalendar/react';
import { EventClickArg, EventHoveringArg, EventContentArg} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useMainContext } from "@/context/MainContext";

export const Calendar: React.FC = () => {
    const mainContext = useMainContext();

    const handleEventClick = async (event: EventClickArg) => {
        const taskId = event.event.id;
        const taskData = mainContext?.taskList?.find(task => task._id === taskId);
        if (taskData) {
            mainContext?.setTaskTemp(taskData);
            mainContext?.setModalType("update-calendar");
            mainContext?.setModal(true);
        }
    };

    const handleEventMouseEnter = (event: EventHoveringArg) => {
        event.el.style.cursor = 'pointer';
    };

    const handleAddTaskClick = () => {
        const emptyTask = {
            title: "",
            deadline: new Date(),
            status: "To do",
            description: "",
            _id: "",
        };
        mainContext?.setTaskTemp(emptyTask);
        mainContext?.setModalType("create-calendar");
        mainContext?.setModal(true);
    };
    const generateColor = (id: string) => {
        const colors = ['#0077C0', '#4B96C3', '#104971'];
        const colorIndex = parseInt(id, 16) % colors.length;
        return colors[colorIndex];
    };

    const renderEventContent = (eventContent: EventContentArg) => {
        const gradientBackground = generateColor(eventContent.event.id);
        return (
            <div style={{ background: gradientBackground, padding: '5px', borderRadius: '5px' }}>
                <b>{eventContent.timeText}</b>
                <i>{eventContent.event.title}</i>
            </div>
        );
    };

    return (
        <>
            
            <FullCalendar 
              plugins={[dayGridPlugin]} 
              initialView="dayGridMonth" 
              height="100%"
              events={mainContext?.eventList}
              eventClick={handleEventClick}
              eventMouseEnter={handleEventMouseEnter}
              eventContent={renderEventContent}
              headerToolbar={{
                right: 'prev,next today addTask',
                left: 'title'
            }}
              customButtons={{
                addTask: {
                    text: 'Add New Task',
                    click: handleAddTaskClick
                }}}
              />
        </>
    );
};