import { render } from '@testing-library/react'
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import {createMemoryHistory} from 'history'

import StoredArticles from './StoredArticles';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';


describe('Contact', () => {
    let contactStore: any;
    let history: any;

    beforeEach(() => {
        contactStore = createTestStore();
        history = createMemoryHistory();
    });

    it('should create', () => {
        const { container } = render(
            <Provider store={contactStore}>
                <Router location={history.location} navigator={history}>
                    <StoredArticles/>
                </Router>
            </Provider>
        );

        expect(container).toBeDefined()
    });
})