
interface taskProps{
    id: string;
    title: string;
    deadline: Date;
    status: string;
    description: string;
}

interface groupProps{
    _id: string;
    title: string;
    taskID: string[];
    tasks: taskProps[];
}

interface inputProps{
    type: string;
    label: string;
    id: string;
    placeholder?: string;
    value?: string;
    onChange: (newValue: string ) => void;
}

interface userProps{
    id: string;
    username: string;
    token?: string;
}

interface taskGroupCountProps{
    groupCount: string;
    taskCount: string;
    completedCount: string;
    uncompletedCount: string;
}

export type {groupProps, taskProps, inputProps, userProps, taskGroupCountProps};
