# libs/gps

Note: Leaflet has `L.Icon.Default.imagePath` which we set in leaflet_service to point to the `assets/icon/leaflet` dir of this library. Leaflet is expecting there to be `marker-icon-2x.png`, `marker-icon.png`, and `marker-shadow.png` as these are hard-coded in case no other icon is supplied for displaying of marker data.

NOTE ALSO: That I have put `globe.svg` in here since the directory already has to exist to put the svg icon to display on a map button. I could have made a sprite sheet like I do for the other libraries but I this dir already exists and that is the only svg. But know that we cauld call `iconService.getSVGElement' to extract the SvgHtmlElement from the sprite sheet should we want to do that, especially if we decided we wanted more default svg icons in this library.
