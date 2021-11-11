import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import "./App.css";
import CourseDetails from "./features/courseDetails/CourseDetails";
import LandingPage from "./features/landingPage/LandingPage";
import LearnMain from "./features/learn/LearnMain";
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
                    <Route exact path="/course/:id" component={CourseDetails} />
                    <Route exact path="/" component={LandingPage} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
