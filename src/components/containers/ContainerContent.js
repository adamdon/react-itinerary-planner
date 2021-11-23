export default function ContainerContent(props)
{

    return (
        <div className={`col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-${props.size}`}>
            <div className="content-container-fluid">


                <div className="card text-white bg-primary">
                    <div className="card-header"><i className={`fa fa-${props.icon}`}></i> {props.title}</div>

                    <div className="card-body">

                        {/*<p className="card-text">*/}
                            {props.children}
                        {/*</p>*/}

                    </div>
                </div>


            </div>
        </div>
    );

}