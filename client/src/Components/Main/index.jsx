import contacto from '../../Images/contactos.jpg';
import mensaje from '../../Images/mensajes.jpg'
import reloj from '../../Images/reloj.jpg'
import autoreply from '../../Images/autoreply.jpg'
import config from '../../Images/configuracion.webp'

const Main = () => {
    return (
        <div className="container my-12 mx-auto px-4 md:px-12">
            <header className='flex items-center justify-center'>
                <h1 className="text-3xl font-bold">
                    WhatsApp Message System
                </h1>
            </header>
            <div className="flex flex-wrap -mx-1 lg:-mx-4">
                {/*  <!-- Column --> */}
                <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">

                    {/*  <!-- Article --> */}
                    <article className="overflow-hidden rounded-lg shadow-lg">

                        <a href="#">
                            <img alt="Placeholder" className="block h-auto w-full" src={contacto} />
                        </a>

                        <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                            <h1 className="text-lg">
                                <a className="no-underline hover:underline text-black" href="#">
                                    Contactos
                                </a>
                            </h1>
                            <p className="text-grey-darker text-sm">
                                ABM
                            </p>
                        </header>
                        <div class="px-6 py-4">
                            <p class="text-gray-700 text-base">
                                Central para dar de alta, modificar datos y dar de baja contactos destinatarios de sus sistema
                            </p>
                        </div>
                        <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                            <a className="flex items-center no-underline hover:underline text-black" href="#">
                                <img alt="Placeholder" className="block rounded-full" src="https://picsum.photos/32/32/?random" />
                                <p className="ml-2 text-sm">
                                    Author Name
                                </p>
                            </a>
                            <a className="no-underline text-grey-darker hover:text-red-dark" href="#">
                                <span className="hidden">Like</span>
                                <i className="fa fa-heart"></i>
                            </a>
                        </footer>

                    </article>
                    {/* <!-- END Article --> */}
                </div>
                {/* <!-- END Column --> */}
                {/*  <!-- Column --> */}
                <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">

                    {/*  <!-- Article --> */}
                    <article className="overflow-hidden rounded-lg shadow-lg">

                        <a href="#">
                            <img alt="Placeholder" className="block h-auto w-full" src={mensaje} />
                        </a>

                        <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                            <h1 className="text-lg">
                                <a className="no-underline hover:underline text-black" href="#">
                                    Mensajes
                                </a>
                            </h1>
                            <p className="text-grey-darker text-sm">
                                ABM
                            </p>
                        </header>
                        <div class="px-6 py-4">
                            <p class="text-gray-700 text-base">
                                Registre aquí los mensajes rápidos o programados. Menasajes recordatorios a sus contactos.
                            </p>
                        </div>
                        <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                            <a className="flex items-center no-underline hover:underline text-black" href="#">
                                <img alt="Placeholder" className="block rounded-full" src="https://picsum.photos/32/32/?random" />
                                <p className="ml-2 text-sm">
                                    Author Name
                                </p>
                            </a>
                            <a className="no-underline text-grey-darker hover:text-red-dark" href="#">
                                <span className="hidden">Like</span>
                                <i className="fa fa-heart"></i>
                            </a>
                        </footer>

                    </article>
                    {/* <!-- END Article --> */}
                </div>
                {/* <!-- END Column --> */}
                {/*  <!-- Column --> */}
                <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">

                    {/*  <!-- Article --> */}
                    <article className="overflow-hidden rounded-lg shadow-lg">

                        <a href="#">
                            <img alt="Placeholder" className="block h-auto w-full" src={reloj} />
                        </a>

                        <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                            <h1 className="text-lg">
                                <a className="no-underline hover:underline text-black" href="#">
                                    En espera
                                </a>
                            </h1>
                            <p className="text-grey-darker text-sm">
                                BM
                            </p>
                        </header>
                        <div class="px-6 py-4">
                            <p class="text-gray-700 text-base">
                                Aquí podrá ver los mensajes que aún no salieron hacia su destinatario, podrá modificarlos o eliminarlos de la cola de espera
                            </p>
                        </div>
                        <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                            <a className="flex items-center no-underline hover:underline text-black" href="#">
                                <img alt="Placeholder" className="block rounded-full" src="https://picsum.photos/32/32/?random" />
                                <p className="ml-2 text-sm">
                                    Author Name
                                </p>
                            </a>
                            <a className="no-underline text-grey-darker hover:text-red-dark" href="#">
                                <span className="hidden">Like</span>
                                <i className="fa fa-heart"></i>
                            </a>
                        </footer>

                    </article>
                    {/* <!-- END Article --> */}
                </div>
                {/* <!-- END Column --> */}
                {/*  <!-- Column --> */}
                <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">

                    {/*  <!-- Article --> */}
                    <article className="overflow-hidden rounded-lg shadow-lg">

                        <a href="#">
                            <img alt="Placeholder" className="block h-auto w-full" src={autoreply} />
                        </a>

                        <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                            <h1 className="text-lg">
                                <a className="no-underline hover:underline text-black" href="#">
                                    Respuestas automaticas
                                </a>
                            </h1>
                            <p className="text-grey-darker text-sm">
                                ABM
                            </p>
                        </header>
                        <div class="px-6 py-4">
                            <p class="text-gray-700 text-base">
                                Registre aquí respuestas automaticas para enviar a sus destinatario, por ejemplo: anunciar el horario de su empresa si llega un mensaje
                                en un momento que no se va a responder. O solo dar la bienvenida y gracias por haberse comunicado.
                            </p>
                        </div>
                        <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                            <a className="flex items-center no-underline hover:underline text-black" href="#">
                                <img alt="Placeholder" className="block rounded-full" src="https://picsum.photos/32/32/?random" />
                                <p className="ml-2 text-sm">
                                    Author Name
                                </p>
                            </a>
                            <a className="no-underline text-grey-darker hover:text-red-dark" href="#">
                                <span className="hidden">Like</span>
                                <i className="fa fa-heart"></i>
                            </a>
                        </footer>

                    </article>
                    {/* <!-- END Article --> */}
                </div>
                {/* <!-- END Column --> */}
                {/*  <!-- Column --> */}
                <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">

                    {/*  <!-- Article --> */}
                    <article className="overflow-hidden rounded-lg shadow-lg">

                        <a href="#">
                            <img alt="Placeholder" className="block h-auto w-full" src={config} />
                        </a>

                        <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                            <h1 className="text-lg">
                                <a className="no-underline hover:underline text-black" href="#">
                                    Configuracion de sistema
                                </a>
                            </h1>
                            <p className="text-grey-darker text-sm">
                                Edit
                            </p>
                        </header>
                        <div class="px-6 py-4">
                            <p class="text-gray-700 text-base">
                                Anote aquí sus datos, si lo desea, y podrá combinarlo con el envio de mensajes.
                            </p>
                        </div>
                        <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                            <a className="flex items-center no-underline hover:underline text-black" href="#">
                                <img alt="Placeholder" className="block rounded-full" src="https://picsum.photos/32/32/?random" />
                                <p className="ml-2 text-sm">
                                    Editar
                                </p>
                            </a>
                            <a className="no-underline text-grey-darker hover:text-red-dark" href="#">
                                <span className="hidden">Like</span>
                                <i className="fa fa-heart"></i>
                            </a>
                        </footer>

                    </article>
                    {/* <!-- END Article --> */}
                </div>
                {/* <!-- END Column --> */}

            </div >
            <footer className='flex items-center justify-center'>
                <p><a href="https://sib-2000.com.ar" target="_blank">Powered by SIB 2000</a></p>
            </footer>
        </div >)
}

export default Main