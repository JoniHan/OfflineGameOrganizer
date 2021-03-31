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
                <>
                    <TextArea
                        key={i}
                        onChange={
                            (e) => {
                                let pools = poolContext.pools;
                                pools[i] = e.target.value;
                                poolContext.setPools(pools);
                            }
                        }
                        labelText={`Participants for pool ${i + 1}, separate with comma, and nothing else`} />
                </>
            );
        }
        return (<>{elementArray}</>);
    }
}

export default PoolInputGroup;