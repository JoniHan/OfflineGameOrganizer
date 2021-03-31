import { getByPlaceholderText } from '@testing-library/dom';
import * as React from 'react';
import styled from 'styled-components';
import PoolContext from '../context/pool';
import { TextArea } from './textarea';

interface IPoolInputGroupPorps {
    count: number;
}

export const PoolInputGroup: React.FC<IPoolInputGroupPorps> = (props) => {
    const poolContext = React.useContext(PoolContext);
    if (!props.count || props.count === 0) {
        return (<></>);
    } else {
        const elementArray: JSX.Element[] = [];
        for (let i = 0; i < props.count; i++) {
            elementArray.push(
                <div key={i} className={'col-md-6'}>
                    <TextArea className={'form-control'}
                        onChange={
                            (e) => {
                                let pools = poolContext.pools;
                                pools[i] = e.target.value;
                                poolContext.setPools(pools);
                            }
                        }
                        labelText={`Participants for pool ${i + 1}`} />
                </div>
            );
        }
        return (
            <>
                {elementArray}
            </>
        );
    }
}

export default PoolInputGroup;