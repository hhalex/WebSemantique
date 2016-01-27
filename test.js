var vie = new VIE();
var results= jQuery("#results");
vie.loadSchema("http://schema.rdfs.org/all.json", 
{
    baseNS : "http://schema.org",
    success: function () {
        alert('success');
        jQuery('#schemaOrg .resultsholder').append('<div class="bg-success">Successfully loaded the schema ontology!</di>');
        jQuery('#schemaOrg .resultsholder').append('<div class="bg-success">We now have ' + this.types.list().length + ' classes loaded!</di>');
        var Place = this.types.get("Place");
        var City = this.types.get("City");
        var Person = this.types.get("Person");
        jQuery("#results").append('<div class="bg-info">BTW (1): A schema:City is <b>' + 
                ((City.isof(Place))? ' ' : 'not ') + 
                '</b>of type schema:Place, but <b>' + 
                ((City.isof(Person))? ' ' : 'not ') + 
                '</b>of schema:Person!</div>');
        jQuery("#results").append('<div class="bg-info">BTW (2): A schema:City has <b>' + City.attributes.list().length + ' attributes, including all inherited!</div>');
    },
    error: function () {
        alert('RiiiiiiiiseClipse');
        jQuery("#results").append('<div class="bg-danger">Something went wrong with loading the ontology!</di>');
    }
});
