"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import CartModal from "@/components/cart-modal"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header forceWhite={true} />
      <div className="pt-28 md:pt-32">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Politique de Confidentialité</h1>

            <div className="space-y-8 text-gray-700 leading-relaxed">
              <p>
                Le site web de kidstorytime.shop est détenu par kidstorytime, qui est responsable du traitement de vos
                données personnelles.
              </p>

              <p>
                Nous avons adopté cette Politique de Confidentialité, qui détermine comment nous traitons les
                informations collectées par kidstorytime et les raisons pour lesquelles nous devons collecter certaines
                données personnelles vous concernant. Par conséquent, vous devez lire cette Politique de Confidentialité
                avant d'utiliser le site web de kidstorytime.
              </p>

              <p>
                Nous prenons soin de vos données personnelles et nous engageons à garantir leur confidentialité et leur
                sécurité.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
                Informations personnelles que nous collectons :
              </h2>
              <p>
                Lorsque vous visitez kidstorytime, nous collectons automatiquement certaines informations sur votre
                appareil, y compris des informations sur votre navigateur web, votre adresse IP, votre fuseau horaire et
                certains des cookies installés sur votre appareil. En outre, lorsque vous naviguez sur le site, nous
                collectons des informations sur les pages web ou produits individuels que vous consultez, les sites web
                ou termes de recherche qui vous ont référé au site, et comment vous interagissez avec le site. Nous
                appelons ces informations collectées automatiquement "Informations sur l'Appareil". De plus, nous
                pouvons collecter les données personnelles que vous nous fournissez (y compris, mais sans s'y limiter,
                votre nom, prénom, adresse, informations de paiement, etc.) lors de l'inscription pour pouvoir remplir
                l'accord.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Pourquoi traitons-nous vos données ?</h2>
              <p>
                Notre priorité est la sécurité des données des clients et, à ce titre, nous pouvons traiter uniquement
                les données minimales des utilisateurs, uniquement dans la mesure absolument nécessaire pour maintenir
                le site web. Les informations collectées automatiquement sont utilisées uniquement pour identifier les
                cas potentiels d'abus et établir des informations statistiques sur l'utilisation du site web. Ces
                informations statistiques ne sont pas agrégées de manière à identifier un utilisateur particulier du
                système.
              </p>

              <p>
                Vous pouvez visiter le site web sans nous dire qui vous êtes ni révéler aucune information par laquelle
                quelqu'un pourrait vous identifier comme un individu spécifique et identifiable. Toutefois, si vous
                souhaitez utiliser certaines fonctionnalités du site web, ou si vous souhaitez recevoir notre newsletter
                ou fournir d'autres détails en remplissant un formulaire, vous pouvez nous fournir des données
                personnelles telles que votre email, prénom, nom, ville de résidence, organisation, numéro de téléphone.
                Vous pouvez choisir de ne pas nous fournir vos données personnelles, mais vous ne pourrez alors
                peut-être pas profiter de certaines fonctionnalités du site web. Par exemple, vous ne pourrez pas
                recevoir notre newsletter ou nous contacter directement depuis le site web. Les utilisateurs qui ne sont
                pas certains des informations obligatoires sont invités à nous contacter via kidstorytime24@gmail.com.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Liens vers d'autres sites web :</h2>
              <p>
                Notre site web peut contenir des liens vers d'autres sites web qui ne sont pas détenus ou contrôlés par
                nous. Veuillez être conscient que nous ne sommes pas responsables des pratiques de confidentialité de
                ces autres sites web ou tiers. Nous vous encourageons à être conscient lorsque vous quittez notre site
                web et à lire les déclarations de confidentialité de chaque site web susceptible de collecter des
                informations personnelles.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Sécurité de l'information :</h2>
              <p>
                Nous sécurisons les informations que vous fournissez sur des serveurs informatiques dans un
                environnement contrôlé et sécurisé, protégés contre tout accès, utilisation ou divulgation non
                autorisés. Nous maintenons des mesures de protection administratives, techniques et physiques
                raisonnables pour se protéger contre l'accès non autorisé, l'utilisation, la modification et la
                divulgation des données personnelles sous notre contrôle et garde. Cependant, aucune transmission de
                données sur Internet ou réseau sans fil ne peut être garantie.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Divulgation légale :</h2>
              <p>
                Nous divulguerons toute information que nous collectons, utilisons ou recevons si cela est requis ou
                permis par la loi, comme pour se conformer à une assignation à comparaître ou un processus légal
                similaire, et lorsque nous croyons de bonne foi que la divulgation est nécessaire pour protéger nos
                droits, protéger votre sécurité ou celle des autres, enquêter sur une fraude, ou répondre à une demande
                gouvernementale.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
                Modifications de la Politique de Confidentialité :
              </h2>
              <p>
                Nous pouvons mettre à jour cette Politique de Confidentialité de temps à autre en publiant une nouvelle
                version sur notre site web. Nous vous encourageons à consulter régulièrement cette page pour prendre
                connaissance des éventuels changements. Les modifications apportées entrent en vigueur dès leur
                publication sur cette page.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Coordonnées :</h2>
              <p>
                Si vous souhaitez nous contacter pour en savoir plus sur cette Politique ou si vous souhaitez nous
                contacter concernant toute question relative aux droits individuels et à vos Informations Personnelles,
                vous pouvez envoyer un courriel à contact@kidstorytime.shop
              </p>
            </div>
          </div>
        </main>
      </div>

      <Footer />
      <WhatsAppButton />
      <CartModal />
    </div>
  )
}
