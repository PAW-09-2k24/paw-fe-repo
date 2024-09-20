interface taskProps{
    id: string;
    title: string;
    deadline: Date;
    status: string;
    description: string;
}

interface groupProps{
    id: string;
    title: string;
    tasks: taskProps[];
}

export type {groupProps, taskProps};
