import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import "./App.css";
import CourseDetails from "./features/courseDetails/CourseDetails";
import LandingPage from "./features/landingPage/LandingPage";
import AllCourses from "./features/learn/AllCourses";
import CompletedCourses from "./features/learn/CompletedCourses";
import LearnMain from "./features/learn/LearnMain";
import PendingCourses from "./features/learn/PendingCourses";
import Profile from "./features/profile/Profile";
import AcceptedCourses from "./features/teach/AcceptedCourses";
import AddCourse from "./features/teach/AddCourse";
import RejectedCourses from "./features/teach/RejectedCourses";
import TeachMain from "./features/teach/TeachMain";
import UploadedCourses from "./features/teach/UploadedCourses";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/learn" component={LearnMain} />
                    <Route exact path="/teach" component={TeachMain} />
                    <Route
                        exact
                        path="/teach/addCourse"
                        component={AddCourse}
                    />
                    <Route
                        exact
                        path="/teach/uploadedCourses"
                        component={UploadedCourses}
                    />
                    <Route
                        exact
                        path="/teach/acceptedCourses"
                        component={AcceptedCourses}
                    />
                    <Route
                        exact
                        path="/teach/rejectedCourses"
                        component={RejectedCourses}
                    />
                    <Route
                        exact
                        path="/learn/allCourses"
                        component={AllCourses}
                    />
                    <Route
                        exact
                        path="/learn/pendingCourses"
                        component={PendingCourses}
                    />
                    <Route
                        exact
                        path="/learn/completedCourses"
                        component={CompletedCourses}
                    />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/course/:id" component={CourseDetails} />
                    <Route exact path="/" component={LandingPage} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
