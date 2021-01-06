import React, { useRef } from 'react';

//явно описываем пропсы которые должны передаваться
interface TodoFormProps {
    onAdd(title: string): void;
}

const TodoForm: React.FC<TodoFormProps> = props => {
    const ref = useRef<HTMLInputElement>(null);
    // const [title, setTitle] = useState<string>('');

    // const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setTitle(event.target.value);
    // };

    const keyPressHandler = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            props.onAdd(ref.current!.value);
            ref.current!.value = '';
            // console.log(title);
            // setTitle('')
        }
    };

    return (
        <div className="input-field mt2">
            <input
                // value={title}
                ref={ref}
                type="text"
                id="title"
                placeholder="Введите названия дела"
                // onChange={changeHandler}
                onKeyPress={keyPressHandler}
            />
            <label htmlFor="title" className="active">
                Введите названия дела
            </label>
        </div>
    );
};

export default TodoForm;
