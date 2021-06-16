This is a Javascirpt matter engine. It can simulate collisions and can give upto 96% precise energies with respect to clock.

To not face any error do as follow ->

Start index.html

1.  ChartUpdate is true by default. Before adding any objects check that to false.

2.  For getting chart of multiple objects at same time, add all objects setting ChartUpdate to false first. After adding the objects, you can set ChartUpdate to true.

3.  Start will apply the parameter specified in the boxes to the objects.

4.  Reset will reset all the object position and it's past history with graph.

5.  Normalize Object will normalize the net velocity of the object at its current position.

6.  Reset object will reset the object to it's origin position without any loss of its history.

7.  For setting angle of an object , double click on that object and click on the specified spot
    for setting the velocity angle to be in that direction.