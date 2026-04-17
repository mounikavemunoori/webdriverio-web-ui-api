
class SearchPage {
    get fromOriginInput () { return $('input[aria-label="Origin location"]') }
    get toDestinationInput () { return $('input[aria-label="Destination location"]') }
    get departureDateInput () { return $('[aria-label="Departure date"]') }
    get returnDateInput () { return $('[aria-label="Return date"]') }
    get travelersInput () { return $('[aria-label="Trip type"]') }
    get searchButton() { return $('button[aria-label="Search"]')}
}