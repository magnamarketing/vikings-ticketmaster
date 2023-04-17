let timerVar = setInterval(() => {
    if (typeof SalesforceInteractions != 'undefined') {
        
        SalesforceInteractions.init({
   
        }).then(() => {
              
            SalesforceInteractions.initSitemap({
                global: {},
                pageTypeDefault: {
                    name: "TicketmasterDefault",
                },
                pageTypes: [
                    {
                        name: 'TicketMaster Vikings Specific Event - Branded Page',
                        interaction: {
                            name: SalesforceInteractions.CatalogObjectInteractionName.ViewCatalogObject,
                            catalogObject: {
                                type: 'Product',
                                id: '$event_id$'
                            }
                        },
                        isMatch: () => true
                    },
                ]
            });   // Initializes the Sitemap
        });

        const sendUserId = () => {
            if (/persistUserId/.test(window.location.href)) {
                try {
                    const urlParams = new URLSearchParams(window.location.search);
                    const anonId = urlParams.get('persistUserId');
                    if (anonId != undefined && anonId != '') {
                        SalesforceInteractions.sendEvent({
                            name: "Ticketmaster ID merge",
                            interaction: {name: "Ticketmaster ID merge"},
                            user: {
                                identities: {
                                    persistId: anonId
                                }
                            }
                        }) 
                    }
                } catch (e) {
                    SalesforceInteractions.sendEvent({
                        name: "Ticketmaster ID merge Failed",
                        interaction: {name: "Ticketmaster ID merge Failed"}
                    })
                }
            }
        
        }

        const abandonedCart = () => {
            SalesforceInteractions.DisplayUtils.pageExit(1000).then(() => {
                SalesforceInteractions.sendEvent({
                    interaction: {
                        name: 'Abandoned Cart'
                    }
                })
            })
        }

        abandonedCart();
        sendUserId();
    }
}, 2000)