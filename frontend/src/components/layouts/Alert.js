import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

export default function Alert({ message, messageType }) {

    // const { message, messageType } = useSelector(state => state.notify)

    return (
        <div className={classNames('alert', {
            'alert-danger': messageType === 'error',
            'alert-success': messageType === 'success'
        })}>
            {message}
        </div>
    )
}
