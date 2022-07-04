import React from "react";
import TeamPage from "pages/TeamPage";
import EmployeeInfo from "components/EmployeeInfo";
import EmployeeWorking from "components/EmployeeWorking";
import EmployeeAdvances from "components/EmployeeAdvances";
import EmployeeStatistic from "components/EmployeeStatistic";
import HomeTemple from "pages/HomeTemple";
import EmployeeDetailPage from "pages/EmployeeDetailPage";
import EmployeePage from "pages/EmployeePage";
import PageNotFound from "pages/PageNotFound";

export const routes = [
    {
        path: "/",
        element: <HomeTemple />,
        children: [
            {
                path: "/",
                element: <EmployeePage />,
            },
            {
                path: ":id",
                element: <EmployeeDetailPage />,
                children: [
                    {
                        path: "info",
                        element: <EmployeeInfo />,
                    },
                    {
                        path: "working",
                        element: <EmployeeWorking />,
                    },
                    {
                        path: "advances",
                        element: <EmployeeAdvances />,
                    },
                    {
                        path: "statistics",
                        element: <EmployeeStatistic />,
                    },
                ],
            },
            {
                path: "team",
                element: <TeamPage />,
            },
        ],
    },
    {
        path: "*",
        element: <PageNotFound/>
    }
];