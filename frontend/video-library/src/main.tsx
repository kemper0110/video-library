import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter} from "react-router-dom";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({})

/*
    DONE: logout
    DONE: navbar: logout \ username
    DONE: video add \ image upload \ request
    DONE: update video \ compose with video add
    DONE: moderator \ update video button
    DONE: show banner instead status while not authorized
    DONE: main page: bottom overlapping
    DONE: main page: bg \ filter side
    DONE: detailed page: type localize(from status) \ if movie - don't show episodes \ close status on choose
    DONE: detailed page: rating stars
    DONE: filter side: rating slider
    DONE: status page: rating/episodes ENTER submit

    Optional:
        TODO: SSE comment observation
        TODO: migrate to NextJS
        TODO: filter side: optimize rating slider
    Medium:
        TODO: video form: validation \ upload progress \ creation status
        TODO: main page: pagination or endless swiping
    Important:
        TODO: main page: cards sizing
        TODO: status page: styling
        TODO: detailed page: adaptive grid layout
        TODO: skeletons: main page \ detailed page
        TODO: user invalidation with events
    Refactoring:
        TODO: endpoints directories cringe | RESTfull endpoints
        TODO: HTML semantic cringe: tags, small components
        TODO: simplify filter side
        TODO: page content simpleness


    Working Volume
    - Login/Registration
    - Video catalog
    - Video detailed
    - Status page
 */


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    </React.StrictMode>,
)
