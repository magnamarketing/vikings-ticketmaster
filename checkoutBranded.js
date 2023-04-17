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
                        name: 'Checkout TicketMaster - Branded Page',
                        interaction: {
                            name: 'Checkout TicketMaster - Branded Page'
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

        const addToCart = () => {
            SalesforceInteractions.sendEvent({
                interaction: {
                    name: SalesforceInteractions.CartInteractionName.AddToCart,
                    lineItem: {
                        catalogObjectType: 'Product',
                        catalogObjectId: '$event_id$',
                        price: 100, 
                        quantity: 1 
                    }
                }
            })
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

        addToCart()
        abandonedCart();
        sendUserId();
    }
}, 2000)