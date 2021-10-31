from typing import List
import numpy as np
import pandas as pd

from sklearn.cluster import KMeans

datafile = "GroupDataset.csv"


class GroupPredictor():

    def __init__(self, datafile: str, n_students: int, n_projects: int) -> None:
        self._datafile = datafile
        self.n_students = n_students
        self.n_projects = n_projects
        self.project_names = []
        self.unique_labels = []
        self.predictor = self._build_clusters()
        self.students = {}

    """
    Processes and applies k-means clustering algorithm to data set
    @Params:
        datafile -> csv file with 20 rows, 6 columns
    @Returns:
        Cluster prediction object
    """

    def _build_clusters(self) -> KMeans:
        data = np.genfromtxt(
            self._datafile,
            delimiter=",",
            skip_header=1,
            usecols=range(1, self.n_projects+1)
        )

        print('data: ', data)

        named_data = np.genfromtxt(
            self._datafile,
            delimiter=",",
            usecols=range(0, self.n_projects+1)
        )

        self.students = named_data

        print('students: ', self.students)

        self.project_names = np.genfromtxt(
            self._datafile,
            delimiter=",",
            skip_footer=self.n_students,
            usecols=range(1, self.n_projects+1),
            dtype="str"
        )

        print('labels: ', self.project_names)

        kmeans = KMeans(
            n_clusters=self.n_projects,
            init="k-means++",
            n_init=50,
            max_iter=500,
            random_state=42,
        )

        # Apply kmeans algorithm
        kmeans.fit(data)
        print('kmeans labels: ', kmeans.labels_)
        self.unique_labels = list(dict.fromkeys(kmeans.labels_))
        print('self.unique_labels: ', self.unique_labels)
        print('cluster centers: ', kmeans.cluster_centers_)
        return kmeans

    """
    Find which group a student has been placed in
    @Params:
        predictor -> Clustering prediction object
        student   -> Integer List of project preferences
    @Returns:
        group     -> Integer representing allocated group
    """

    def predict_group(self, student: List[int]) -> int:
        return self.predictor.predict([student])

    def predict_groups(self, students: List[List[int]]):
        return self.predictor.predict(students)

    def get_group_name(self, group_num) -> str:
        group_index = self.unique_labels.index(group_num)
        return self.project_names[group_index]

    # def get_results(self) -> dict:
    #     results = {}
    #     for student in students:
    #         results[student_id] = self.predict_group(student_prediction)
    #     return results


# Testing functions
predictor = GroupPredictor(datafile, 20, 5)

prediction1 = predictor.predict_group([5, 2, 1, 3, 4])
print('prediction 1: ', prediction1)
print('group name: ', predictor.get_group_name(prediction1))

# print('prediction 2: ', predictor.predict([[5, 1, 2, 3, 4]]))
# print('prediction 3: ', predictor.predict([[4, 5, 1, 2, 3]]))
# print('prediction 4: ', predictor.predict([[3, 4, 5, 1, 2]]))
# print('prediction 5: ', predictor.predict([[2, 3, 4, 5, 1]]))
